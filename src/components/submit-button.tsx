import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

export default function SubmitButton({
    variant = "default",
    children,
    className,
    ...props
}: React.ComponentProps<"button"> & {
    variant?:
        | "link"
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | null
        | undefined;
    children: React.ReactNode;
}) {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            className={cn("w-full capitalize", className)}
            disabled={pending}
            variant={variant}
            {...props}
        >
            {pending ? (
                <LoaderIcon className="animate-spin text-primary" />
            ) : (
                children
            )}
        </Button>
    );
}
