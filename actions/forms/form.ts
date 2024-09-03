"use server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { formSchema, FormSchemaType } from "@/schemas/form";

class UserNotFoundErr extends Error {}

export async function GetFormStates() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  const stats = await db.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
}

export async function CreateForm(data: FormSchemaType) {
  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    throw new Error("form not valid");
  }

  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  const form = await db.form.create({
    data: {
      userId: user?.id!,
      name: data.name,
      description: data.description,
    },
  });

  if (!form) {
    throw new Error("something went wrong");
  }

  return form.id;
}

export async function GetForms() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await db.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function GetFormById(formId: string) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await db.form.findUnique({
    where: {
      userId: user.id,
      id: formId,
    },
  });
}

export async function UpdateFormContent(id: string, jsonContent: string) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await db.form.update({
    where: {
      id: id,
      userId: user.id,
    },
    data: {
      content: jsonContent,
    },
  });
}

export async function PublishForm(id: string) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundErr();
  }

  return await db.form.update({
    where: {
      id: id,
      userId: user.id,
    },
    data: {
      published: true,
    },
  });
}

export async function GetFormContentByUrl(formURL: string) {
  return await db.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareURL: formURL,
    },
  });
}

export async function SubmitForm(formURL: string, jsonContent: string) {
  return await db.form.update({
    where: {
      shareURL: formURL,
    },
    data: {
      submissions: {
        increment: 1,
      },
      formSubmissions: {
        create: {
          content: jsonContent,
        },
      },
    },
  });
}
