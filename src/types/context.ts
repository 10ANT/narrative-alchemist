import { DropResult } from "@hello-pangea/dnd";
import { KanbanSectionType, KanbanTaskType } from "./data";
import { Control } from "react-hook-form";
import { BaseSyntheticEvent } from "react";
import { BootstrapVariantType } from "./component-props";

export type FormControlSubmitType = {
  control: Control<any>;
  newRecord: (values: BaseSyntheticEvent) => void;
  editRecord: (values: BaseSyntheticEvent) => void;
  deleteRecord: (id: string) => void;
};

export type KanbanType = {
  sections: KanbanSectionType[];
  activeSectionId: KanbanSectionType["id"] | undefined;
  newTaskModal: {
    open: boolean;
    toggle: (
      sectionId?: KanbanSectionType["id"],
      taskId?: KanbanTaskType["id"],
    ) => void;
  };
  sectionModal: {
    open: boolean;
    toggle: () => void;
  };
  taskFormData: KanbanTaskType | undefined;
  sectionFormData: KanbanSectionType | undefined;
  taskForm: FormControlSubmitType;
  sectionForm: FormControlSubmitType;
  getAllTasksPerSection: (
    sectionId: KanbanSectionType["id"],
  ) => KanbanTaskType[];
  onDragEnd: (result: DropResult) => void;
};

export type NotificationContextType = {
  showNotification: ({ title, message, variant }: ShowNotificationType) => void
}

export type ShowNotificationType = {
  title?: string
  message: string
  variant?: BootstrapVariantType
  delay?: number
}

export type ToastrProps = {
  show: boolean
  onClose?: () => void
} & ShowNotificationType