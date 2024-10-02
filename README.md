# DuAnTotNghiep_TaskManager


/* Hướng dẫn sử dụng thêm */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryAsyncThunk, fetchAllCategoriesAsync } from '../../categories/CategoriesSlice';
import { Button, TextField, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useTheme, useMediaQuery } from '@mui/material';
import { selectProductIsFilterOpen, toggleFilters } from '../../products/ProductSlice';

const AddCategory = () => {
     const [name, setName] = useState('');
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const theme = useTheme();
     const is500 = useMediaQuery(theme.breakpoints.down(500));
     const isProductFilterOpen = useSelector(selectProductIsFilterOpen);

     const handleSubmit = (e) => {
          e.preventDefault();
          dispatch(addCategoryAsyncThunk({ name })).then(() => {
               navigate('/admin/categories');
          });
     };

     const handleFilterClose = () => {
          dispatch(toggleFilters());
     };

     useEffect(() => {
          dispatch(fetchAllCategoriesAsync());
     }, [dispatch]);

     return (
          <>
               <AdminSidebar handleFilterClose={handleFilterClose} isProductFilterOpen={isProductFilterOpen} is500={is500} />
               <Stack rowGap={5} mt={5} mb={'3rem'} mx={'2rem'}>
                    <Typography variant="h4">Thêm Danh Mục</Typography>
                    <form onSubmit={handleSubmit}>
                         <Stack rowGap={3}>
                              <TextField label="Tên Danh Mục" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} required />
                              <Button type="submit" variant="contained" color="primary">
                                   Thêm Danh Mục
                              </Button>
                         </Stack>
                    </form>
               </Stack>
          </>
     );
};

export default AddCategory;

/* Hướng dẫn sử dụng cập nhật */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  updateCategoryAsyncThunk, 
  fetchAllCategoriesAsync,
  selectCategories,
} from "../../categories/CategoriesSlice";
import { Button, TextField, Stack, Typography } from "@mui/material";
import AdminSidebar from "./AdminSidebar";
import { useTheme, useMediaQuery } from "@mui/material";
import {
  selectProductIsFilterOpen,
  toggleFilters,
} from "../../products/ProductSlice";

const EditCategory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(selectCategories);
  const [name, setName] = useState("");
  const theme = useTheme();
  const is500 = useMediaQuery(theme.breakpoints.down(500));
  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchAllCategoriesAsync());
    } else {
      const category = categories.find((cat) => cat._id === id);
      if (category) {
        setName(category.name);
      }
    }
  }, [categories, dispatch, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategoryAsyncThunk({ id, name })).then(() => {
      navigate("/admin/categories");
    });
  };

  const handleFilterClose = () => {
    dispatch(toggleFilters());
  };

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch]);

  return (
    <>
      <AdminSidebar
        handleFilterClose={handleFilterClose}
        isProductFilterOpen={isProductFilterOpen}
        is500={is500}
      />
      <Stack rowGap={5} mt={5} mb={"3rem"} mx={"2rem"}>
        <Typography variant="h4">Chỉnh Sửa Danh Mục</Typography>
        <form onSubmit={handleSubmit}>
          <Stack rowGap={3}>
            <TextField
              label="Tên Danh Mục"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Cập Nhật Danh Mục
            </Button>
          </Stack>
        </form>
      </Stack>
    </>
  );
};

export default EditCategory;


/* Hướng dẫn sử dụng lấy tất cả & xóa */


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryAsync,
  fetchAllCategoriesAsync,
  selectCategories,
  selectCategoryStatus,
} from "../../categories/CategoriesSlice";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  Typography,
  IconButton,
  Popover,
  Button as MuiButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminSidebar from "./AdminSidebar";
import { useTheme, useMediaQuery } from "@mui/material";
import {
  selectProductIsFilterOpen,
  toggleFilters,
} from "../../products/ProductSlice";
import MenuIcon from "@mui/icons-material/Menu";

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const status = useSelector(selectCategoryStatus);
  const theme = useTheme();
  const is500 = useMediaQuery(theme.breakpoints.down(500));
  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);

  const handleFilterClose = () => {
    dispatch(toggleFilters());
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleDeleteClick = (event, category) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategory(category);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedCategory(null);
  };

  const handleDeleteConfirm = () => {
    dispatch(deleteCategoryAsync(selectedCategory._id));
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSidebarToggle = () => {
    dispatch(toggleFilters());
  };

  useEffect(() => {
    dispatch(fetchAllCategoriesAsync());
  }, [dispatch]);

  return (
    <>
      <AdminSidebar
        handleFilterClose={handleFilterClose}
        isProductFilterOpen={isProductFilterOpen}
        is500={is500}
      />
      <Stack rowGap={5} mt={5} mb={"3rem"}>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mx={"2rem"}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleSidebarToggle}
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4">Danh mục</Typography>
          <Button
            component={Link}
            to="/admin/add-category"
            variant="contained"
            color="primary"
          >
            Thêm danh mục
          </Button>
        </Stack>

        <Stack rowGap={5} mt={5} mb={"3rem"}>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mx={"2rem"}
          >
            <TableContainer
              component={Paper}
              sx={{ maxHeight: 440, width: "100%", margin: "0 auto" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên</TableCell>
                    <TableCell>Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category._id}>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>
                        <Stack flexDirection={"row"} columnGap={2}>
                          <IconButton
                            component={Link}
                            to={`/admin/category-update/${category._id}`}
                            color="primary"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={(event) =>
                              handleDeleteClick(event, category)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Stack>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Typography sx={{ p: 2 }}>
            Bạn có chắc chắn muốn xóa danh mục này không?
          </Typography>
          <Stack direction="row" spacing={2} sx={{ p: 2 }}>
            <MuiButton
              variant="contained"
              color="primary"
              onClick={handleClose}
            >
              Hủy
            </MuiButton>
            <MuiButton
              variant="contained"
              color="error"
              onClick={handleDeleteConfirm}
            >
              Xóa
            </MuiButton>
          </Stack>
        </Popover>
      </Stack>
    </>
  );
};

export default CategoryList;
