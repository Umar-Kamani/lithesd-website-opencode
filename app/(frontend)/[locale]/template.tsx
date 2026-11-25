import { ViewTransition } from "react";

/**
 * Route-level view transition.
 *
 * The header is anchored separately (see `view-transition-name: site-header`),
 * so only page content fades and settles. Browsers without the View Transitions
 * API simply navigate as before.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}
