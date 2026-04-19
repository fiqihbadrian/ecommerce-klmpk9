import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./ui/button";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function EmptyState({ title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="glass-card rounded-[28px] p-6 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <FontAwesomeIcon icon={faBoxOpen} className="h-6 w-6" />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      {actionLabel && actionHref ? (
        <Button asChild variant="primary" className="mt-5 w-full">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      ) : null}
    </div>
  );
}