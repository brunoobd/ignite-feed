import styles from "./styles.module.css";

import { useState } from "react";

import { Post as PostProps } from "../../models/Post";
import { Comment as CommentProps } from "../../models/Comment";

import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Avatar } from "../Avatar";
import { Comment } from "../Comment";

type Props = PostProps & {
  onDeleteComment: (
    postId: PostProps["id"],
    commentId: CommentProps["id"]
  ) => void;
};

export const Post = ({
  id,
  author,
  content,
  publishedAt,
  comments,
  onDeleteComment,
}: Props) => {
  const { name, role, avatarUrl } = author;
  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  const handleDeleteComment = (commentId: CommentProps["id"]) =>
    onDeleteComment(id, commentId);

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{name}</strong>
            <span>{role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(({ type, content }) => {
          if (type === "paragraph") {
            return <p key={content}>{content}</p>;
          } else if (type === "link") {
            return (
              <p key={content}>
                <a href="#">{content}</a>
              </p>
            );
          }
        })}
      </div>

      <form className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea placeholder="Deixe um comentário" />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(({ id, author, content, publishedAt, likes }) => (
          <Comment
            key={id}
            id={id}
            author={author}
            publishedAt={publishedAt}
            content={content}
            likes={likes}
            onDeleteComment={handleDeleteComment}
          />
        ))}
      </div>
    </article>
  );
};
