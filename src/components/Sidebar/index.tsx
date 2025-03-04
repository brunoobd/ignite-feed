import styles from "./styles.module.css";

import { User } from "../../models/User";

import { PencilLine } from "@phosphor-icons/react";

import { Avatar } from "../Avatar";

type Props = {
  user: User;
};

export const Sidebar = ({ user }: Props) => {
  return (
    <aside className={styles.sidebar}>
      <img className={styles.cover} src={user.coverUrl} />

      <div className={styles.profile}>
        <Avatar src={user.avatarUrl} />

        <strong>{user.name}</strong>
        <span>{user.role}</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  );
};
