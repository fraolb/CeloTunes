import ThemeToggle from "@/components/ThemeToggle";

const Profile = () => {
  return (
    <div className="flex items-center justify-center min-h-screen transition-colors duration-300">
      <div className="text-center">
        <h1 className="text-4xl mb-4">Welcome to My Themed Next.js App</h1>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Profile;
