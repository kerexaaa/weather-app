import { IconType } from "react-icons";
interface IconStar {
  icon: IconType;
}
const IconComponent: React.FC<IconStar> = ({ icon: Icon }) => {
  return <Icon />;
};
export default IconComponent;
