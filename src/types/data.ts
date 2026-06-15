import { StaticImageData } from "next/image";
import { BootstrapVariantType } from "./component-props";

export type IdType = string;

export type BrandListType = {
  id: IdType;
  name: string;
  category: string;
  image: StaticImageData;
  since: number;
  Stores: string;
  products: string;
};

export type UserType = {
  id: IdType;
  name: string;
  image?: StaticImageData;
  date: Date;
  email: string;
  allMessage?: boolean;
  message: string;
  iconColor?: string;
  voiceMessage?: boolean;
  unRead?: number;
  sendMessage?: boolean;
  activeOffline?: "Active" | "Offline" | "Typing,,,,";
  isSend?: boolean;
  icon?: string;
};

export type FileType = Partial<File> & {
  preview?: string;
};

export type ChatMessageType = {
  id: IdType;
  from: UserType;
  to: UserType;
  message: {
    type: "file" | "text";
    value: FileType[] | string;
  };
  sentOn?: Date;
};

export type ActivityType = {
  title: string;
  icon?: string;
  variant?: BootstrapVariantType;
  status?: "completed" | "latest";
  files?: FileType[];
  time: Date;
  type?: "task" | "design" | "achievement";
  content?: string;
};

export type SocialEventType = {
  id: IdType;
  title: string;
  venue: string;
  type: "togetherness" | "celebration" | "professional";
  image: StaticImageData;
  startsAt: Date;
};

export type EmailType = {
  id: IdType;
  isStar?: boolean;
  image: StaticImageData;
  name: string;
  subTitle: string;
  description: string;
  IsAttachment?: number;
  date: Date;
  variant?: string;
};

export type KanbanSectionType = {
  id: IdType;
  title: string;
};

export type KanbanTaskType = {
  id: IdType;
  sectionId: KanbanSectionType["id"];
  section?: KanbanSectionType;
  title: string;
  description?: string;
  image?: StaticImageData;
  variant: string;
  priority: "High" | "Medium" | "Low";
  views: number;
  share: number;
  commentsCount: number;
  progress?: number;
  members: StaticImageData[];
};

export type KanbanDialogType = {
  showNewTaskModal: boolean;
  showSectionModal: boolean;
};

export const getKanbanSectionVariant = (title: KanbanSectionType["title"]) => {
  let variant = "primary";
  if (title === "To Do") variant = "pink";
  else if (title === "In Progress") variant = "warning";
  else if (title === "Review") variant = "success";
  else if (title === "Done") variant = "info";
  return variant;
};

export type ProductType = {
  id: IdType;
  name: string;
  // image: StaticImageData
  description: string;
  date: Date;
  price: number;
  quantity: number;
  brand: string[];
  averagePriceMin: number;
  averagePriceMax: number;
  sellingItems: string[];
  discountsAvailable: string;
  category: string;
  status: "Active" | "Inactive";
  productName: string;
  discountPrice: number;
  size: string;
  rating: {
    star: number;
    review: number;
  };
  isDeal?: boolean;
  isSeal?: boolean;
};

export type SocialUserType = {
  id: IdType;
  name: string;
  email: string;
  image: StaticImageData;
  phone: string;
  role?: string;
  BirthDate: string;
};

export type InvoicesType = {
  id: IdType;
  userId: SocialUserType["id"];
  users?: SocialUserType;
  productId: ProductType["id"];
  products?: ProductType;
  amount: string;
  date: Date;
  invoicesStatus: "Paid" | "Cancelled" | "Pending";
};

export type Employee = {
  id: IdType;
  name: string;
  email: string;
  position: string;
  company: string;
  country: string;
  office: string;
  age: number;
  startDate: string;
  salary: string;
};

export type FilesType = {
  id: IdType;
  icon: string;
  title: string;
  fileVariant: string;
  file: string;
  date: Date;
  userId: SocialUserType["id"];
  user?: SocialUserType;
  size: number;
  members: {
    text: string;
    variant: string;
  }[];
};
