"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  Typography,
} from "@mui/material";

const AvatarMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        sx={{
          backgroundColor: anchorEl ? "primary.main" : "#919eab14",
          width: 40,
          height: 40,
        }}
      >
        <Avatar
          alt="avatar sample"
          src="/assets/profile/pic-4.jpg"
          sx={{
            width: 36,
            height: 36,
            border: "2px solid #fff",
          }}
        />
      </IconButton>

      <Popover
        id="Avatar Menu"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPopover-paper": {
            minWidth: 16,
            minHeight: 16,
            maxWidth: "calc(100% - 32px)",
            maxHeight: "calc(100% - 32px)",
            backdropFilter: "blur(20px)",
            backgroundColor: "#ffffffe6",
            backgroundImage:
              'url("/assets/cyan-blur.png"), url("/assets/red-blur.png")',
            backgroundPosition: "right top, left bottom",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundSize: "50% 50%",
            boxShadow:
              "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
            borderRadius: "5px",
            width: 200,
            overflow: "inherit",
            ml: "6px",
            p: 0,
          },
        }}
      >
        <Box
          sx={{
            width: 14,
            height: 14,
            position: "absolute",
            borderBottomLeftRadius: "3.5px",
            clipPath: "polygon(0% 0%, 100% 100%, 0% 100%)",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            backdropFilter: "blur(6px)",
            backgroundColor: "#212b36cc",
            top: -6.5,
            transform: "rotate(135deg)",
            right: 32,
          }}
        />

        <Box sx={{ p: "16px 16px 12px" }}>
          <Typography
            variant="subtitle2"
            noWrap
            sx={{
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Wyn Christian Rebanal
          </Typography>
          <Typography
            variant="body2"
            noWrap
            sx={{
              fontWeight: 400,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            admin@gmail.com
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: "dashed", color: "#919eab33" }} />

        <Stack p={1}>
          <Link
            href="/dashboard-sample"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem
              sx={{
                borderRadius: 1,
                p: "6px 8px",
              }}
            >
              Home
            </MenuItem>
          </Link>
          <Link
            href="/dashboard-sample"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem
              sx={{
                borderRadius: 1,
                p: "6px 8px",
              }}
            >
              Profile
            </MenuItem>
          </Link>
          <Link
            href="/dashboard-sample"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem
              sx={{
                borderRadius: 1,
                p: "6px 8px",
              }}
            >
              Settings
            </MenuItem>
          </Link>
        </Stack>
        <Divider sx={{ borderStyle: "dashed", color: "#919eab33" }} />

        <Link
          href="/dashboard-sample"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <MenuItem
            sx={{
              lineHeight: 1.577,
              fontSize: "0.875rem",
              p: "6px 8px",
              m: 1,
              fontWeight: 700,
              color: "#ff5630",
            }}
          >
            Logout
          </MenuItem>
        </Link>
      </Popover>
    </Box>
  );
};

export default AvatarMenu;
