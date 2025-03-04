import "./global.css";
import styles from "./App.module.css";

import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Post as PostProps } from "./models/Post";
import { Post } from "./components/Post";

function App() {
  const posts: PostProps[] = [
    {
      id: "1",
      author: {
        name: "Bruno Silva",
        role: "Desenvolvedor Frontend",
        avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
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
    },
    {
      id: "2",
      author: {
        name: "Mariana Costa",
        role: "UI/UX Designer",
        avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
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
    },
    {
      id: "3",
      author: {
        name: "Carlos Mendes",
        role: "Engenheiro de Software",
        avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
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
    },
  ];

  return (
    <>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(({ author, content, publishedAt }: PostProps) => (
            <Post author={author} content={content} publishedAt={publishedAt} />
          ))}
        </main>
      </div>
    </>
  );
}

export default App;
