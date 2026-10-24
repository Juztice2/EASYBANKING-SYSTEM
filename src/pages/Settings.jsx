import { useEffect, useState } from "react";
import {
  UserRound,
  ShieldCheck,
  Bell,
  Palette,
  LockKeyhole,
  LogOut,
  ChevronRight,
  Check,
  Camera,
  Eye,
  EyeOff,
  Info,
  Save,
  Monitor,
  Moon,
  Sun,
  Mail,
  Smartphone,
  KeyRound,
  LoaderCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { auth, db } from "../firebase";

import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  updateDoc,
} from "firebase/firestore";

const settingsSections = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "privacy", label: "Privacy", icon: LockKeyhole },
];

export default function Settings() {
  const { currentUser, details } = useAuth();

  const [activeSection, setActiveSection] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);

  const [notifications, setNotifications] = useState({
    email: true,
    transactions: true,
    security: true,
    productUpdates: false,
  });

  const [theme, setTheme] = useState("light");

  const [privacy, setPrivacy] = useState({
    activityHistory: true,
    personalizedTips: false,
  });

  useEffect(() => {
    if (details) {
      setFirstName(details.Firstname || "");
      setLastName(details.Lastname || "");
    }
  }, [details]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("novabank-theme");

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }

    try {
      const savedNotifications = JSON.parse(
        localStorage.getItem("novabank-notifications") || "null"
      );

      if (savedNotifications) {
        setNotifications((previous) => ({
          ...previous,
          ...savedNotifications,
        }));
      }

      const savedPrivacy = JSON.parse(
        localStorage.getItem("novabank-privacy") || "null"
      );

      if (savedPrivacy) {
        setPrivacy((previous) => ({
          ...previous,
          ...savedPrivacy,
        }));
      }
    } catch {
      console.warn("Unable to load saved demo preferences.");
    }
  }, []);

  const showMessage = (text) => {
    setMessage(text);
    setError("");
  };

  const showError = (text) => {
    setError(text);
    setMessage("");
  };

  const saveProfile = async (event) => {
    event.preventDefault();

    if (!details?.id) {
      showError("Your Firestore account document could not be found.");
      return;
    }

    if (!firstName.trim() || !lastName.trim()) {
      showError("Please enter both your first and last name.");
      return;
    }

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const accountRef = doc(db, "Account", details.id);

      await updateDoc(accountRef, {
        Firstname: firstName.trim(),
        Lastname: lastName.trim(),
      });

      showMessage("Your profile has been updated successfully.");
    } catch (err) {
      console.error("Profile update error:", err);
      showError(
        err.code === "permission-denied"
          ? "Permission denied. Check your Firestore security rules."
          : "Unable to update your profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const savePassword = async (event) => {
    event.preventDefault();

    if (!currentUser?.email) {
      showError("Please sign in again before changing your password.");
      return;
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      showError("Please complete all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      showError("Your new password must contain at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      showError("Your new passwords do not match.");
      return;
    }

    if (newPassword === currentPassword) {
      showError("Your new password must be different from the current one.");
      return;
    }

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );

      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPassword);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      showMessage("Your password has been changed successfully.");
    } catch (err) {
      console.error("Password update error:", err);

      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-login-credentials"
      ) {
        showError("Your current password is incorrect.");
      } else if (err.code === "auth/too-many-requests") {
        showError("Too many attempts. Please try again later.");
      } else if (err.code === "auth/requires-recent-login") {
        showError("Please sign out and sign in again, then retry.");
      } else {
        showError("Unable to change your password. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  const toggleNotification = (key) => {
    setNotifications((previous) => {
      const updated = { ...previous, [key]: !previous[key] };

      localStorage.setItem(
        "novabank-notifications",
        JSON.stringify(updated)
      );

      return updated;
    });
  };

  const togglePrivacy = (key) => {
    setPrivacy((previous) => {
      const updated = { ...previous, [key]: !previous[key] };

      localStorage.setItem("novabank-privacy", JSON.stringify(updated));

      return updated;
    });
  };

  const changeTheme = (nextTheme) => {
    setTheme(nextTheme);
    localStorage.setItem("novabank-theme", nextTheme);
    showMessage(
      `${nextTheme === "dark" ? "Dark" : "Light"} appearance preference saved.`
    );
  };

  const handleSignOut = async () => {
    const confirmed = window.confirm("Are you sure you want to sign out?");

    if (!confirmed) return;

    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign-out error:", err);
      showError("Unable to sign out. Please try again.");
    }
  };

  const isDark = theme === "dark";

  const pageClass = isDark
    ? "min-h-screen bg-gray-950 text-gray-100"
    : "min-h-screen bg-gray-50/70 text-gray-900";

  const panelClass = isDark
    ? "border-gray-800 bg-gray-900"
    : "border-gray-100 bg-white";

  const mutedClass = isDark ? "text-gray-400" : "text-gray-500";

  const inputClass = isDark
    ? "border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus:border-green-500"
    : "border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-green-600";

  const sectionButtonClass = (selected) =>
    `flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
      selected
        ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300"
        : isDark
          ? "text-gray-300 hover:bg-gray-800"
          : "text-gray-600 hover:bg-gray-50"
    }`;

  const inputLabelClass = "mb-2 block text-sm font-medium";

  const renderToggle = (checked, onChange, label) => (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked ? "bg-green-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );

  const renderProfile = () => (
    <form onSubmit={saveProfile}>
      <div className="border-b border-gray-100 p-5 dark:border-gray-800 sm:p-7">
        <h2 className="text-lg font-bold">Profile Information</h2>
        <p className={`mt-1 text-sm ${mutedClass}`}>
          Manage the personal information associated with your account.
        </p>
      </div>

      <div className="p-5 sm:p-7">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-2xl font-bold uppercase text-green-800">
            {(firstName[0] || "") + (lastName[0] || "") || <UserRound size={30} />}
          </div>

          <div>
            <h3 className="font-semibold">{`${firstName} ${lastName}`.trim() || "Your Name"}</h3>

            <p className={`mt-1 text-sm ${mutedClass}`}>
              {currentUser?.email || "Email unavailable"}
            </p>

            <p className="mt-2 text-xs text-green-700">
              Profile photo upload is not enabled in this demo.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={inputLabelClass}>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              autoComplete="given-name"
              required
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${inputClass}`}
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label className={inputLabelClass}>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              autoComplete="family-name"
              required
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${inputClass}`}
              placeholder="Enter last name"
            />
          </div>

          <div className="sm:col-span-2">
            <label className={inputLabelClass}>Email Address</label>

            <input
              type="email"
              value={currentUser?.email || ""}
              readOnly
              className={`w-full cursor-not-allowed rounded-xl border px-4 py-3 text-sm outline-none ${inputClass} opacity-70`}
            />

            <p className={`mt-2 text-xs ${mutedClass}`}>
              Email changes are not available on this page.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <LoaderCircle size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </form>
  );

  const renderSecurity = () => (
    <>
      <div className="border-b border-gray-100 p-5 dark:border-gray-800 sm:p-7">
        <h2 className="text-lg font-bold">Security Settings</h2>
        <p className={`mt-1 text-sm ${mutedClass}`}>
          Update your password and review account security options.
        </p>
      </div>

      <form onSubmit={savePassword} className="space-y-5 p-5 sm:p-7">
        <div>
          <label className={inputLabelClass}>Current Password</label>
          <input
            type={showPasswords ? "text" : "password"}
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            autoComplete="current-password"
            required
            className={`w-full rounded-xl border px-4 py-3 text-sm outline-none ${inputClass}`}
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label className={inputLabelClass}>New Password</label>
          <input
            type={showPasswords ? "text" : "password"}
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
            className={`w-full rounded-xl border px-4 py-3 text-sm outline-none ${inputClass}`}
            placeholder="At least 8 characters"
          />
        </div>

        <div>
          <label className={inputLabelClass}>Confirm New Password</label>
          <input
            type={showPasswords ? "text" : "password"}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            autoComplete="new-password"
            minLength={8}
            required
            className={`w-full rounded-xl border px-4 py-3 text-sm outline-none ${inputClass}`}
            placeholder="Repeat new password"
          />
        </div>

        <button
          type="button"
          onClick={() => setShowPasswords(!showPasswords)}
          className={`flex items-center gap-2 text-sm ${mutedClass} hover:text-green-700`}
        >
          {showPasswords ? <EyeOff size={17} /> : <Eye size={17} />}
          {showPasswords ? "Hide passwords" : "Show passwords"}
        </button>

        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-800">
          <div className="flex items-start gap-2">
            <Info size={18} className="mt-0.5 shrink-0" />
            <p>
              Firebase may require you to sign in again before changing your
              password. Your current password is checked before the update.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
          >
            {saving ? (
              <LoaderCircle size={18} className="animate-spin" />
            ) : (
              <KeyRound size={18} />
            )}
            {saving ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>

      <div className="border-t border-gray-100 p-5 dark:border-gray-800 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Firebase Authentication</h3>
              <p className={`mt-1 text-xs leading-5 ${mutedClass}`}>
                Your sign-in is managed through Firebase Authentication.
              </p>
            </div>
          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Enabled
          </span>
        </div>
      </div>
    </>
  );

  const renderNotifications = () => {
    const options = [
      {
        key: "email",
        title: "Email Notifications",
        description: "General account updates and announcements.",
        icon: Mail,
      },
      {
        key: "transactions",
        title: "Transaction Notifications",
        description: "Demo alerts for simulated account activity.",
        icon: Bell,
      },
      {
        key: "security",
        title: "Security Alerts",
        description: "Illustrative sign-in and security alerts.",
        icon: ShieldCheck,
      },
      {
        key: "productUpdates",
        title: "Product Updates",
        description: "New features and demo announcements.",
        icon: Smartphone,
      },
    ];

    return (
      <>
        <div className="border-b border-gray-100 p-5 dark:border-gray-800 sm:p-7">
          <h2 className="text-lg font-bold">Notification Preferences</h2>
          <p className={`mt-1 text-sm ${mutedClass}`}>
            Choose your preferred notification settings.
          </p>
        </div>

        <div className="divide-y divide-gray-100 p-5 dark:divide-gray-800 sm:p-7">
          {options.map((option) => {
            const Icon = option.icon;

            return (
              <div
                key={option.key}
                className="flex items-center justify-between gap-4 py-5 first:pt-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">{option.title}</h3>
                    <p className={`mt-1 text-xs leading-5 ${mutedClass}`}>
                      {option.description}
                    </p>
                  </div>
                </div>

                {renderToggle(
                  notifications[option.key],
                  () => toggleNotification(option.key),
                  option.title
                )}
              </div>
            );
          })}

          <p className={`pt-5 text-xs leading-5 ${mutedClass}`}>
            These are locally saved interface preferences. They do not
            currently send emails, SMS messages, or push notifications.
          </p>
        </div>
      </>
    );
  };

  const renderAppearance = () => (
    <>
      <div className="border-b border-gray-100 p-5 dark:border-gray-800 sm:p-7">
        <h2 className="text-lg font-bold">Appearance</h2>
        <p className={`mt-1 text-sm ${mutedClass}`}>
          Choose how this settings page should look.
        </p>
      </div>

      <div className="p-5 sm:p-7">
        <h3 className="text-sm font-semibold">Theme</h3>
        <p className={`mt-1 text-sm ${mutedClass}`}>
          Your selection is saved in this browser.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { id: "light", label: "Light Mode", icon: Sun },
            { id: "dark", label: "Dark Mode", icon: Moon },
          ].map((option) => {
            const Icon = option.icon;
            const selected = theme === option.id;

            return (
              <button
                type="button"
                key={option.id}
                onClick={() => changeTheme(option.id)}
                className={`rounded-2xl border-2 p-5 text-left transition ${
                  selected
                    ? "border-green-600 bg-green-50/50 dark:bg-green-950/30"
                    : isDark
                      ? "border-gray-700 hover:border-gray-600"
                      : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      selected
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Icon size={22} />
                  </div>

                  {selected && (
                    <Check size={20} className="text-green-700" />
                  )}
                </div>

                <h4 className="mt-4 text-sm font-semibold">{option.label}</h4>

                <p className={`mt-1 text-xs ${mutedClass}`}>
                  {option.id === "light"
                    ? "A bright, clean interface."
                    : "A darker interface for this page."}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-start gap-2 text-blue-800">
            <Monitor size={18} className="mt-0.5 shrink-0" />
            <p className="text-xs leading-5">
              This theme switch currently changes the appearance of the
              Settings page. To apply it across the entire application,
              connect the theme state to your shared app layout or context.
            </p>
          </div>
        </div>
      </div>
    </>
  );

  const renderPrivacy = () => (
    <>
      <div className="border-b border-gray-100 p-5 dark:border-gray-800 sm:p-7">
        <h2 className="text-lg font-bold">Privacy Preferences</h2>
        <p className={`mt-1 text-sm ${mutedClass}`}>
          Manage optional preferences for this demo application.
        </p>
      </div>

      <div className="divide-y divide-gray-100 p-5 dark:divide-gray-800 sm:p-7">
        <div className="flex items-center justify-between gap-4 py-5 first:pt-0">
          <div>
            <h3 className="text-sm font-semibold">Activity History Preference</h3>
            <p className={`mt-1 text-xs leading-5 ${mutedClass}`}>
              A sample preference for showing demo activity history.
            </p>
          </div>

          {renderToggle(
            privacy.activityHistory,
            () => togglePrivacy("activityHistory"),
            "Activity history preference"
          )}
        </div>

        <div className="flex items-center justify-between gap-4 py-5 last:pb-0">
          <div>
            <h3 className="text-sm font-semibold">Personalized Tips</h3>
            <p className={`mt-1 text-xs leading-5 ${mutedClass}`}>
              Allow illustrative tips in the demo interface.
            </p>
          </div>

          {renderToggle(
            privacy.personalizedTips,
            () => togglePrivacy("personalizedTips"),
            "Personalized tips"
          )}
        </div>

        <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-start gap-2 text-blue-800">
            <Info size={18} className="mt-0.5 shrink-0" />
            <p className="text-xs leading-5">
              These options only save preferences in your browser. They do not
              change server-side data collection or security rules.
            </p>
          </div>
        </div>
      </div>
    </>
  );

  const sectionContent = {
    profile: renderProfile,
    security: renderSecurity,
    notifications: renderNotifications,
    appearance: renderAppearance,
    privacy: renderPrivacy,
  };

  return (
    <main className={`${pageClass} px-4 py-6 font-poppins transition-colors sm:px-6 lg:px-8`}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
            <ShieldCheck size={25} />
          </div>

          <h1 className="text-2xl font-bold sm:text-3xl">
            Settings
          </h1>

          <p className={`mt-2 text-sm sm:text-base ${mutedClass}`}>
            Manage your profile, security, and preferences.
          </p>
        </div>

        {/* Status messages */}
        {message && (
          <div
            role="status"
            className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
          >
            <Check size={19} className="mt-0.5 shrink-0" />
            <p>{message}</p>
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            <Info size={19} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Layout */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-4">
          {/* Navigation */}
          <aside className={`rounded-2xl border p-3 shadow-sm ${panelClass}`}>
            <div className="px-3 pb-3 pt-2">
              <p className={`text-xs font-semibold uppercase tracking-wider ${mutedClass}`}>
                Account Settings
              </p>
            </div>

            <nav className="space-y-1">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                const selected = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => {
                      setActiveSection(section.id);
                      setMessage("");
                      setError("");
                    }}
                    className={sectionButtonClass(selected)}
                  >
                    <Icon size={19} />

                    <span className="flex-1">{section.label}</span>

                    {selected && <ChevronRight size={17} />}
                  </button>
                );
              })}
            </nav>

            <div className="my-4 border-t border-gray-100 dark:border-gray-800" />

            <button
              type="button"
              onClick={handleSignOut}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 ${
                isDark ? "hover:bg-red-950/30" : ""
              }`}
            >
              <LogOut size={19} />
              Sign Out
            </button>
          </aside>

          {/* Active section */}
          <section className={`min-w-0 overflow-hidden rounded-2xl border shadow-sm lg:col-span-3 ${panelClass}`}>
            {sectionContent[activeSection]()}
          </section>
        </div>

        {/* Footer */}
        <div className={`mt-6 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between ${mutedClass}`}>
          <p>NOVABANK · Account Settings</p>
          <p className="flex items-center gap-2">
            <ShieldCheck size={15} className="text-green-600" />
            Demo application
          </p>
        </div>
      </div>
    </main>
  );
}

