import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import AdminLayout from '../AdminLayout';

import AddCategory from '../pages/AddCategory';
import DashboardCards from '../pages/Dashboard';
import UserManagement from '../pages/UserManagement';
import FoodMenu from '../pages/Categories';
import Vendor from '../pages/Vendor';
import DeliverPartners from '../pages/DeliveryPartners';
import VendorDetails from '../pages/VendorDetails';
import UserDetails from '../pages/UserDetails';
import AddBanner from '../pages/AddBanner';
import Transactions from '../pages/Transactions';
import Categories from '../pages/Categories';
import DeliveryPartnerDetails from '../pages/DeliveryPartnerDetails';
import DeliveryPartnerRequest from '../pages/DeliveryPartnerRequest';
import VendorsTotalOrders from '../pages/VendorsTotalOrders';
import VendorTotalFoodItem from '../pages/VendorTotalFoodItem';
import VendorTotalRevenu from '../pages/VendorTotalRevenu';
import VendorRequest from '../pages/VendorRequest';
import AddBannerForm from '../pages/AddBannerForm';
import AddCategoryForm from '../pages/AddCategoryForm';

const AppRoutes = () => {
  return (
    <Routes>
      {/* ✅ Default Route is LoginPage */}
      <Route path="/" element={<LoginPage />} />

      {/* ✅ All Admin Routes under /admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardCards />} />
        <Route path="manage-users" element={<UserManagement />} />
        <Route path="categories" element={<Categories />} />
        <Route path="food-menu" element={<FoodMenu />} />
        <Route path="vendor" element={<Vendor />} />
        <Route path="vendor-details/:id" element={<VendorDetails />} />
        <Route path="user-details/:id" element={<UserDetails />} />
        <Route path="delivery-partners" element={<DeliverPartners />} />
        <Route path="delivery-partners/:id" element={<DeliveryPartnerDetails />} />
        <Route path="request" element={<DeliveryPartnerRequest />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="add-category" element={<AddCategory />} />
        <Route path="add-category-form" element={<AddCategoryForm />} />
        <Route path="add-banner" element={<AddBanner />} />
        <Route path="add-banner-form" element={<AddBannerForm />} />
        <Route path="vendor-orders" element={<VendorsTotalOrders />} />
        <Route path="vendor-food-item" element={<VendorTotalFoodItem />} />
        <Route path="vendor-revenue" element={<VendorTotalRevenu />} />
        <Route path="vendor-request" element={<VendorRequest />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
