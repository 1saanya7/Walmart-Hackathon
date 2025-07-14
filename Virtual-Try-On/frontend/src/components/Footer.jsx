import { Typography } from "antd";

const { Text } = Typography;

const Footer = ({ isDarkMode }) => {
  const background = isDarkMode ? "#1a1a1a" : "#f0f0f0";
  const textColor = isDarkMode ? "#cccccc" : "#333333";

  return (
    <footer
      style={{
        backgroundColor: background,
        padding: "1.5rem 1rem",
        textAlign: "center",
        marginTop: "4rem",
      }}
    >
      
    </footer>
  );
};

export default Footer;
