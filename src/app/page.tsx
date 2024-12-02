import CompanyHeader from "../components/CompanyHeader";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-inter)]">
      <main className="flex p-2 min-h-screen">
        <div className="border-gray-200 border-2 w-screen rounded p-4">
          <CompanyHeader />
        </div>
      </main>
    </div>
  );
}
