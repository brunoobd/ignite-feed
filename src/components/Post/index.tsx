import styles from "./styles.module.css";

import { ChangeEvent, FormEvent, useRef, useState } from "react";

import { Post as PostType } from "../../models/Post";
import { Comment as CommentType } from "../../models/Comment";
import { User } from "../../models/User";

import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Avatar } from "../Avatar";
import { Comment } from "../Comment";

type Props = PostType & {
  currentUser: User;
  onAddComment: (postId: PostType["id"], commentContent: string) => void;
  onDeleteComment: (
    postId: PostType["id"],
    commentId: CommentType["id"]
  ) => void;
  onAddCommentLike: (
    postId: PostType["id"],
    commentId: CommentType["id"]
  ) => void;
};

export const Post = ({
  id,
  author,
  content,
  publishedAt,
  comments,
  currentUser,
  onAddComment,
  onDeleteComment,
  onAddCommentLike,
}: Props) => {
  const [newComment, setNewComment] = useState("");
  const newCommentInputRef = useRef<HTMLTextAreaElement>(null);
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
  const isNewCommentEmpty = newComment.length === 0;

  const handleNewCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewComment(event.target.value);
  };

  const handleNewCommentInvalid = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  };

  const handleCreateNewComment = (event: FormEvent) => {
    event.preventDefault();

    onAddComment(id, newComment);

    setNewComment("");

    newCommentInputRef.current?.blur();
  };

  const handleDeleteComment = (commentId: CommentType["id"]) => {
    onDeleteComment(id, commentId);
  };

  const handleAddCommentLike = (commentId: CommentType["id"]) => {
    onAddCommentLike(id, commentId);
  };

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

        <textarea
          ref={newCommentInputRef}
          placeholder="Deixe um comentário"
          value={newComment}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button
            type="submit"
            onClick={handleCreateNewComment}
            disabled={isNewCommentEmpty}
          >
            Publicar
          </button>
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
            currentUser={currentUser}
            onDeleteComment={handleDeleteComment}
            onAddCommentLike={handleAddCommentLike}
          />
        ))}
      </div>
    </article>
  );
};
