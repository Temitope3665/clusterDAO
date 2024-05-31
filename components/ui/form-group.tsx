import { cn } from "@/libs/utils";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const FormGroup: React.FC<Props> = ({ children, className }) => (
  <div className={cn('relative flex items-center w-full', className)}>{children}</div>
);

export default FormGroup;
