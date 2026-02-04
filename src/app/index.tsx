import { AppRouterProvider } from "./providers/router-provider";
import { AppQueryProvider } from "./providers/query-client-provider";

export function App() {
  return (
    <AppQueryProvider>
      <AppRouterProvider />
    </AppQueryProvider>
  );
}
