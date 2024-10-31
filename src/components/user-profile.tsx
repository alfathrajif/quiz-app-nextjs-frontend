import { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as UserIcon } from "lucide-react";

const UserProfile = ({ user }: { user: User }) => {
  return (
    <div className="ml-3 flex items-center gap-x-2">
      <Avatar className="h-10 w-10">
        <AvatarImage src="#" />
        <AvatarFallback>
          <UserIcon className="w-5 h-5 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium">{user.name}</div>
        <div className="capitalize text-primary text-xs">{user.role.name}</div>
      </div>
    </div>
  );
};

export default UserProfile;
