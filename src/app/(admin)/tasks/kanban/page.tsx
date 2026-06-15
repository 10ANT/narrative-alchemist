import { KanbanProvider } from "@/context/useKanbanContext";
import { Metadata } from "next";
import Board from "./components/Board";

export const metadata: Metadata = { title: "Kanban" };

const KanbanPage = () => {
  return (
    <>
      <KanbanProvider>
        <Board />
      </KanbanProvider>
    </>
  );
};

export default KanbanPage;
