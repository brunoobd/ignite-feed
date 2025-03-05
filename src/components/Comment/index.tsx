import styles from "./styles.module.css";

import { ptBR } from "date-fns/locale";
import { format, formatDistanceToNow } from "date-fns";

import { Comment as CommentType } from "../../models/Comment";
import { User } from "../../models/User";

import { ThumbsUp, Trash } from "@phosphor-icons/react";

import { Avatar } from "../Avatar";

type Props = CommentType & {
  currentUser: User;
  onDeleteComment: (commentId: CommentType["id"]) => void;
  onAddCommentLike: (commentId: CommentType["id"]) => void;
};

export const Comment = ({
  id,
  author,
  publishedAt,
  content,
  likes,
  currentUser,
  onDeleteComment,
  onAddCommentLike,
}: Props) => {
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

  const handleDeleteComment = () => onDeleteComment(id);

  const handleAddCommentLike = () => onAddCommentLike(id);

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src={author.avatarUrl} />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{author.name}</strong>
              <time
                title={publishedDateFormatted}
                dateTime={publishedAt.toISOString()}
              >
                {publishedDateRelativeToNow}
              </time>
            </div>

            {currentUser.id === author.id && (
              <button title="Deletar comentário" onClick={handleDeleteComment}>
                <Trash size={24} />
              </button>
            )}
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleAddCommentLike}>
            <ThumbsUp />
            Aplaudir <span>{likes}</span>
          </button>
        </footer>
      </div>
    </div>
  );
};
