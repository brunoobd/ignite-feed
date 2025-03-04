import styles from "./styles.module.css";
import { Avatar } from "../Avatar";
import { ThumbsUp, Trash } from "@phosphor-icons/react";
import { Comment as CommentProps } from "../../models/Comment";
import { ptBR } from "date-fns/locale";
import { format, formatDistanceToNow } from "date-fns";

type Props = CommentProps & {
  onDeleteComment: (commentId: CommentProps["id"]) => void;
};

export const Comment = ({
  id,
  author,
  publishedAt,
  content,
  likes,
  onDeleteComment,
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

            <button title="Deletar comentário" onClick={handleDeleteComment}>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button>
            <ThumbsUp />
            Aplaudir <span>{likes}</span>
          </button>
        </footer>
      </div>
    </div>
  );
};
