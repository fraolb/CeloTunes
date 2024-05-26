import ThemeToggle from "@/components/ThemeToggle";

const Profile = () => {
  return (
    <div className="justify-center min-h-screen transition-colors duration-300">
      <div className="flex justify-end px-4 py-2">
        <ThemeToggle />
      </div>
      <div className="text-center my-4">
        <h1 className="text-2xl mb-4">Welcome Fraolb</h1>
      </div>
    </div>
  );
};

export default Profile;
