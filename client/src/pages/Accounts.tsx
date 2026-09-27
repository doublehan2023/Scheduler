import { useEffect, useState } from "react";
import { dummyAccountsData, PLATFORMS } from "../assets/assets";
import { PlusIcon } from "lucide-react";
import AccountList from "../components/AccountList";

type Account = (typeof dummyAccountsData)[number];

const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showPlatformPicker, setShowPlatformPicker] = useState(false);

  const fetchAccounts = async (
    isSync = false,
    platform?: string | null,
    successMsg?: string,
  ) => {
    setAccounts(dummyAccountsData);
    console.log(isSync, platform, successMsg);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleDisconnect = async (accountId: string) => {
    setAccounts((currentAccounts) =>
      currentAccounts.filter((account) => account._id !== accountId),
    );
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between
      gap-4 text-sm"
      >
        <div>
          <h2 className="text-xl text-slate-900">Connected Accounts</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            {accounts.length} of {PLATFORMS.length} platforms connected
          </p>
        </div>
        <button
          onClick={() => setShowPlatformPicker(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-500
        hover:bg-red-600 text-white rounded-full font-medium transition-all
        w-full sm:w-auto justify-center"
        >
          <PlusIcon className="size-4" /> Connect Account
        </button>
      </div>

      {/* Platform picker modal */}
      {showPlatformPicker && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">
            Platform connection is not configured yet.
          </p>
          <button
            onClick={() => setShowPlatformPicker(false)}
            className="mt-3 text-sm text-red-500"
          >
            Close
          </button>
        </div>
      )}

      {/* Connected Account List */}
      <AccountList accounts={accounts} onDisconnect={handleDisconnect} />
    </div>
  );
};

export default Accounts;
