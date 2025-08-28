import { Box } from "@mui/material";
import { keyframes } from "@mui/system";
import MenuBookIcon from "@mui/icons-material/MenuBook";

/**
 * FloatingIcon Component
 * ----------------------
 * A reusable animated icon component that adds a visual appeal
 * to the homepage before a user starts searching.
 * 
 * - Uses keyframes for a smooth left-to-right floating animation
 * - Encased in a styled container with shadow for emphasis
 * - Displays the Book icon as the branding symbol
 */

// Keyframe animation for smooth horizontal floating effect
const floatAnim = keyframes`
  0%, 100% { transform: translateX(-50px); }
  50% { transform: translateX(50px); }
`;

export default function FloatingIcon() {
  return (
    // Outer container: centers the icon and gives background styling
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        backgroundColor:"white",
        width:"40%",
        m:'auto',
        mt:12,
        borderRadius:"50px",
        boxShadow:"1px 1px 10px black",
        mb:3
      }}
    >
      {/* Inner circle: animated Book icon */}
      <Box
        sx={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          bgcolor: "primary.dark",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 0 30px rgba(0,0,0,0.05)",
          animation: `${floatAnim} 3s ease-in-out infinite`, // applies floating effect
        }}
      >
        <MenuBookIcon sx={{ fontSize: 32, color: "white" }} />
      </Box>
    </Box>
  );
}
