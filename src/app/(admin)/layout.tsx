import AdminWrapper from "./AdminWrapper";
import { ChildrenType } from "@/types/component-props";

export default function AdminLayout({ children }: ChildrenType) {
  return <AdminWrapper>{children}</AdminWrapper>;
}
