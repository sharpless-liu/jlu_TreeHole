import { request } from "../utils/request";
import { getJwtToken, getUser } from "./auth";
export async function createPost(image, description) {
  const formData = new FormData();
  formData.append("files", image);

  const uploadResponse = await fetch("/api/upload", {
    method: "POST",
    body: formData,
    headers: { Authorization: `Bearer ${getJwtToken()}` },
  });

  const uploadResult = await uploadResponse.json();
  const uploadedFileId = uploadResult[0].id;

  // Step 2: 创建 Post 实体，附带 image ID
  const postPayload = {
    data: {
      description: description,
      image: [uploadedFileId],
      user: `${getUser().id}`,
    },
  };
  const postResponse = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getJwtToken()}`,
    },
    body: JSON.stringify(postPayload),
  });
  console.log(JSON.stringify(postPayload));
}

export async function loadPosts() {
  const response = await request("/api/posts?populate=*");
  const currentUserId = getUser()?.id;
  return response.data.map((post) => ({
    id: post?.id,
    image: post?.image[0]?.url,
    user: post?.user,
    description: post?.description,
    publishedAt: post?.publishedAt,
    liked_bies: post?.liked_bies,
    favored_bies: post?.favored_bies,
    comments: post?.comments,
    documentId: post?.documentId,
    isLiked: post?.liked_bies.some((user) => {
      return user.id == currentUserId;
    }),
    isFavored: post?.favored_bies.some((user) => {
      return user.id == currentUserId;
    }),
  }));
}
export async function likePost(documentId, isLiked) {
  const result = await request(
    `/api/posts/${documentId}?populate[0]=liked_bies`,
    {
      method: "GET",
    }
  );
  const like = result.data.liked_bies.length;
  const likeFinal = isLiked ? like - 1 : like + 1;
  if (isLiked) {
    //"删除一个对象的特定见·"
    const response = await request(`/api/posts/${documentId}`, {
      method: "PUT",
      body: {
        data: {
          liked_bies: result.data.liked_bies
            .filter((user) => {
              return user.id != getUser().id;
            })
            .map((user) => {
              const { ["documentId"]: _, ...rest } = user;
              console.log(rest);
              return rest;
            }),
        },
      },
    });
  } else {
    const response = await request(`/api/posts/${documentId}`, {
      method: "PUT",
      body: {
        data: {
          liked_bies: [...result.data.liked_bies, getUser()].map((user) => {
            const { ["documentId"]: _, ...rest } = user;
            console.log(rest);
            return rest;
          }),
        },
      },
    });
  }
  return likeFinal;
}
export async function favorPost(documentId, isFavored) {
  const result = await request(
    `/api/posts/${documentId}?populate[0]=favored_bies`,
    {
      method: "GET",
    }
  );
  const favor = result.data.favored_bies.length;
  const favorFinal = isFavored ? favor - 1 : favor + 1;
  if (isFavored) {
    //"删除一个对象的特定见·"
    const response = await request(`/api/posts/${documentId}`, {
      method: "PUT",
      body: {
        data: {
          favored_bies: result.data.favored_bies
            .filter((user) => {
              return user.id != getUser().id;
            })
            .map((user) => {
              const { ["documentId"]: _, ...rest } = user;
              console.log(rest);
              return rest;
            }),
        },
      },
    });
  } else {
    const response = await request(`/api/posts/${documentId}`, {
      method: "PUT",
      body: {
        data: {
          favored_bies: [...result.data.favored_bies, getUser()].map((user) => {
            const { ["documentId"]: _, ...rest } = user;
            console.log(rest);
            return rest;
          }),
        },
      },
    });
  }
  return favorFinal;
}
