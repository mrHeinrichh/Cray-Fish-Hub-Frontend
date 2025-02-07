"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getAllArticles = async (searchParams) => {
  let params = new URLSearchParams(searchParams);

  const response = await fetch(
    `${process.env.SERVER_URL}/articles?${params.toString()}`,
    { next: { tags: ["articles"] }, cache: "no-cache" }
  );

  const result = await response.json();

  revalidateTag("articles");

  return result;
};

export const getArticleDetail = async (id) => {
  const response = await fetch(`${process.env.SERVER_URL}/articles/${id}`, {
    cache: "no-store",
    next: { tags: ["articles"] },
  });

  const result = await response.json();

  if (result.status == "success") {
    return result.data[0];
  }

  return result;
};

export const getArticleComments = async (articleId) => {
  const response = await fetch(
    `${process.env.SERVER_URL}/comments/article/${articleId}`,
    {
      next: { tags: ["articles", "comments"] },
    }
  );

  const result = await response.json();

  if (result.status == "success") {
    return result.data;
  }

  return result;
};

export const createArticle = async (currentState, formData) => {
  const new_article = Object.fromEntries(formData);

  new_article.status =
    new_article.isPublished === "on" ? "Published" : "In Draft";
  new_article.author = cookies().get("currentUser").value;

  const response = await fetch(`${process.env.SERVER_URL}/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(new_article),
  });

  const result = await response.json();

  if (result.status == "success") {
    revalidateTag("articles");
    redirect(`/admin/articles/details/${result.data[0]._id}`);
  }
};

export const createArticleComment = async (currentState, formData) => {
  const new_comment = Object.fromEntries(formData);
  new_comment.author = cookies().get("currentUser").value;

  const response = await fetch(`${process.env.SERVER_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(new_comment),
  });

  const result = await response.json();

  if (result.status == "success") {
    revalidateTag("comments");
  }
};

export const editArticle = async (currentState, formData) => {
  const article = Object.fromEntries(formData);

  article.status = article.isPublished === "on" ? "Published" : "In Draft";

  const response = await fetch(
    `${process.env.SERVER_URL}/articles/${currentState?._id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    }
  );

  const result = await response.json();

  if (result.status == "success") {
    revalidateTag("articles");
    redirect(`/admin/articles/details/${result.data[0]._id}`);
  }
};

export const deleteArticle = async (currentState, formData) => {
  const response = await fetch(
    `${process.env.SERVER_URL}/articles/${formData.get("id")}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await response.json();

  if (result.status == "success") {
    revalidateTag("articles");
  }

  return result;
};

export const deleteArticleComment = async (currentState, formData) => {
  const response = await fetch(
    `${process.env.SERVER_URL}/comments/${formData.get("id")}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await response.json();

  if (result.status == "success") {
    revalidateTag("comments");
  }

  return result;
};
