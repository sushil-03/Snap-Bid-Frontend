"use client";

import * as React from "react";
import { Button, Menu, MenuItem, Box, Typography, Paper } from "@mui/material";
import { MdFilterList, MdChevronRight } from "react-icons/md";
import { useRouter } from "next/router";
import { categories, statusList } from "utils/constant";

export default function FilterDropdownMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [categoryAnchorEl, setCategoryAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [statusAnchorEl, setStatusAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const router = useRouter();
  const selectedCategory = router.query.cate as string;
  const selectedStatus = router.query.status as string;
  const open = Boolean(anchorEl);
  const categoryOpen = Boolean(categoryAnchorEl);
  const statusOpen = Boolean(statusAnchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCategoryAnchorEl(null);
    setStatusAnchorEl(null);
  };

  const handleCategoryClick = (event: React.MouseEvent<HTMLElement>) => {
    setCategoryAnchorEl(event.currentTarget);
    setStatusAnchorEl(null); // Close status submenu
  };

  const handleStatusHover = (event: React.MouseEvent<HTMLElement>) => {
    setStatusAnchorEl(event.currentTarget);
    setCategoryAnchorEl(null); // Close category submenu
  };

  const handleSubmenuClose = () => {
    setCategoryAnchorEl(null);
    setStatusAnchorEl(null);
  };

  const searchByCategory = (category: string) => {
    if (!category || category === "") {
      if (!selectedStatus || selectedStatus === "") {
        router.push("/explore");
      } else {
        router.push(`/explore?status=${selectedStatus}`);
      }
    } else {
      if (!selectedStatus || selectedStatus === "") {
        router.push(`/explore?cate=${category}`);
      } else {
        router.push(`/explore?cate=${category}&status=${selectedStatus}`);
      }
    }
  };
  const searchByStatus = (status: string) => {
    if (!status || status === "") {
      if (!selectedCategory || selectedCategory === "") {
        router.push("/explore");
      } else {
        router.push(`/explore?cate=${selectedCategory}`);
      }
    } else {
      if (!selectedCategory || selectedCategory === "") {
        console.log("11");
        router.push(`/explore?status=${status}`);
      } else {
        router.push(`/explore?cate=${selectedCategory}&status=${status}`);
      }
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<MdFilterList className="" size={20} />}
        onClick={handleClick}
        sx={{
          textTransform: "none",
          borderColor: "#e0e0e0",
          color: "#424242",
          "&:hover": {
            backgroundColor: "transparent",
            borderColor: "transparent",
          },
        }}
      ></Button>

      {/* Main Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "filter-button",
        }}
        PaperProps={{
          elevation: 8,
          sx: {
            minWidth: 180,
            mt: 1,
          },
        }}
      >
        <MenuItem
          onClick={handleCategoryClick}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <Typography>Category</Typography>
          <MdChevronRight size={16} color="#9e9e9e" />
        </MenuItem>

        <MenuItem
          onClick={handleStatusHover}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <Typography>Status</Typography>
          <MdChevronRight size={16} color="#9e9e9e" />
        </MenuItem>
      </Menu>

      {/* Category Submenu */}
      <Menu
        anchorEl={categoryAnchorEl}
        open={categoryOpen}
        onClose={handleSubmenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          elevation: 8,
          sx: {
            minWidth: 140,
            ml: 0.5,
          },
        }}
      >
        <MenuItem
          onClick={() => searchByCategory("")}
          sx={{
            backgroundColor: selectedCategory === "All" ? "#f5f5f5" : "white",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <Typography>All</Typography>
        </MenuItem>
        {categories.map((item, key) => {
          return (
            <MenuItem
              key={key}
              onClick={() => searchByCategory(item.name)}
              sx={{
                backgroundColor:
                  selectedCategory === item.name ? "#f5f5f5" : "white",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <Typography>{item.name}</Typography>
            </MenuItem>
          );
        })}
      </Menu>

      {/* Status Submenu */}
      <Menu
        anchorEl={statusAnchorEl}
        open={statusOpen}
        onClose={handleSubmenuClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          elevation: 8,
          sx: {
            minWidth: 140,
            ml: 0.5,
          },
        }}
      >
        <MenuItem
          onClick={() => searchByStatus("")}
          sx={{
            backgroundColor: selectedStatus === "All" ? "#f5f5f5" : "white",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <Typography>All</Typography>
        </MenuItem>
        {statusList.map((item, key) => {
          return (
            <MenuItem
              key={key}
              onClick={() => searchByStatus(item)}
              sx={{
                backgroundColor: selectedStatus === item ? "#f5f5f5" : "white",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              <Typography>{item}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
