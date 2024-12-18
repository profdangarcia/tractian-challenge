import AssetsView from "../components/AssetsView";
import CompanyHeader from "../components/CompanyHeader";
import ComponentView from "../components/ComponentView";
import { AssetsProvider } from "../contexts/AssetsContext";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-inter)]">
      <main className="flex p-2 min-h-[calc(100vh-3.5rem)]">
        <div className="flex flex-col gap-3 border-gray-200 border-2 w-full rounded p-4">
          <AssetsProvider>
            <CompanyHeader />
            <div className="flex gap-2 w-full h-full">
              <div className="w-1/3">
                <AssetsView />
              </div>
              <div className="w-2/3">
                <ComponentView />
              </div>
            </div>
          </AssetsProvider>
        </div>
      </main>
    </div>
  );
}
