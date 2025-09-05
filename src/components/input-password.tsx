"use client";

import { Input } from "./ui/input";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { Button } from "./ui/button";

export default function Password({
    state,
    id,
    name,
    ...props
}: {
    state?: string;
    id: string;
    name: string;
} & React.ComponentPropsWithoutRef<"input">) {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div className="relative">
            <Input
                id={id}
                name={name}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                defaultValue={state || ""}
                {...props}
            />
            <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPassword((prev) => !prev);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors size-8 cursor-pointer hover:bg-transparent"
                type="button"
                tabIndex={-1}
                disabled={props.disabled}
            >
                {showPassword ? <EyeClosed /> : <Eye />}
            </Button>
        </div>
    );
}
