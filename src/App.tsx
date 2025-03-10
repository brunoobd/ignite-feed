import "./global.css";
import styles from "./App.module.css";

import { useState } from "react";

import { User } from "./models/User";
import { Comment } from "./models/Comment";
import { Post as PostType } from "./models/Post";

import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Post } from "./components/Post";

const App = () => {
  const [posts, setPosts] = useState<Array<PostType>>([
    {
      id: 1,
      author: {
        id: 2,
        name: "Bruno Silva",
        role: "Desenvolvedor Frontend",
        avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
        coverUrl:
          "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50",
      },
      content: [
        { type: "paragraph", content: "Fala, galera! 🚀" },
        {
          type: "paragraph",
          content: "Acabei de concluir mais um projeto incrível em React!",
        },
        { type: "link", content: "https://github.com/brunodev/meu-projeto" },
      ],
      publishedAt: new Date("2024-03-03T14:00:00"),
      comments: [
        {
          id: 101,
          author: {
            id: 3,
            name: "João Pereira",
            avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg",
          },
          publishedAt: new Date("2024-03-03T15:10:00"),
          content: "Parabéns pelo projeto! Ficou incrível! 🚀",
          likes: 3,
        },
        {
          id: 102,
          author: {
            id: 4,
            name: "Ana Souza",
            avatarUrl: "https://randomuser.me/api/portraits/women/5.jpg",
          },
          publishedAt: new Date("2024-03-03T15:30:00"),
          content: "Ótimo trabalho! Como você implementou a responsividade?",
          likes: 5,
        },
      ],
    },
    {
      id: 2,
      author: {
        id: 5,
        name: "Mariana Costa",
        role: "UI/UX Designer",
        avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
        coverUrl:
          "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50",
      },
      content: [
        {
          type: "paragraph",
          content: "Hoje foi dia de testar novas animações no Figma! 🎨✨",
        },
        {
          type: "paragraph",
          content: "Quem aí já testou o novo recurso de prototipagem?",
        },
        { type: "link", content: "https://dribbble.com/marianacosta" },
      ],
      publishedAt: new Date("2024-03-02T10:30:00"),
      comments: [
        {
          id: 103,
          author: {
            id: 6,
            name: "Lucas Almeida",
            avatarUrl: "https://randomuser.me/api/portraits/men/6.jpg",
          },
          publishedAt: new Date("2024-03-02T12:00:00"),
          content: "Muito bom! Vou dar uma olhada no código no GitHub. 😃",
          likes: 2,
        },
      ],
    },
    {
      id: 3,
      author: {
        id: 7,
        name: "Carlos Mendes",
        role: "Engenheiro de Software",
        avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
        coverUrl:
          "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50",
      },
      content: [
        {
          type: "paragraph",
          content: "Refatorei um código legado hoje e aprendi bastante! 🔥",
        },
        {
          type: "paragraph",
          content:
            "Dicas para quem quer melhorar código: simplicidade > complexidade.",
        },
        {
          type: "link",
          content: "https://dev.to/carlosmendes/refatoracao-boas-praticas",
        },
      ],
      publishedAt: new Date("2024-03-01T18:45:00"),
      comments: [
        {
          id: 104,
          author: {
            id: 8,
            name: "Fernanda Lima",
            avatarUrl: "https://randomuser.me/api/portraits/women/7.jpg",
          },
          publishedAt: new Date("2024-03-01T19:00:00"),
          content: "Esse projeto é open-source? Gostaria de contribuir!",
          likes: 7,
        },
      ],
    },
  ]);
  const currentUser: User = {
    id: 1,
    name: "Bruno Duarte",
    role: "Associate Software Enginner",
    avatarUrl: "https://github.com/brunoobd.png",
    coverUrl:
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50",
  };

  const addComment = (postId: PostType["id"], commentContent: string) => {
    const post = posts.find((post) => post.id === postId);
    const commentsIds = post!.comments.map((comment) => comment.id);
    const newCommentId = commentsIds.length ? Math.max(...commentsIds) + 1 : 0;

    setPosts((prevPosts) =>
      prevPosts.map(
        (post): PostType =>
          post.id === postId
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  {
                    id: newCommentId,
                    author: currentUser,
                    content: commentContent,
                    publishedAt: new Date(),
                    likes: 0,
                  },
                ],
              }
            : post
      )
    );
  };

  const deleteComment = (postId: PostType["id"], commentId: Comment["id"]) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.filter(
                (comment) => comment.id !== commentId
              ),
            }
          : post
      )
    );
  };

  const addCommentLike = (postId: PostType["id"], commentId: Comment["id"]) => {
    setPosts((prevPosts) =>
      prevPosts.map(
        (post): PostType =>
          post.id === postId
            ? {
                ...post,
                comments: post.comments.map((comment) => {
                  if (comment.id === commentId) {
                    return { ...comment, likes: comment.likes + 1 };
                  }

                  return comment;
                }),
              }
            : post
      )
    );
  };

  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar user={currentUser} />

        <main>
          {posts.map(
            ({ id, author, content, publishedAt, comments }: PostType) => (
              <Post
                key={id}
                id={id}
                author={author}
                content={content}
                publishedAt={publishedAt}
                comments={comments}
                currentUser={currentUser}
                onAddComment={addComment}
                onDeleteComment={deleteComment}
                onAddCommentLike={addCommentLike}
              />
            )
          )}
        </main>
      </div>
    </>
  );
};

export default App;
