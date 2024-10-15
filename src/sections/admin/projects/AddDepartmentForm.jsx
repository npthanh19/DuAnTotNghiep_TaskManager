import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select'; // Import react-select
import { addDepartmentToProject, removeDepartmentFromProject, getProjectById } from '../../../services/projectsService';
import { getAllDepartments } from '../../../services/deparmentsService';

const AddDepartmentForm = ({ projectId, onClose, onAddSuccess, onRemoveSuccess }) => {
     const [departments, setDepartments] = useState([]);
     const [selectedDepartmentIds, setSelectedDepartmentIds] = useState([]);
     const [projectName, setProjectName] = useState('');
     const [addedDepartmentIds, setAddedDepartmentIds] = useState([]);

     useEffect(() => {
          const fetchProject = async () => {
               try {
                    const projectData = await getProjectById(projectId);
                    setProjectName(projectData.project_name);
                    setAddedDepartmentIds(projectData.departments.map((dept) => dept.id));
               } catch (error) {
                    console.error('Error fetching project:', error);
               }
          };

          const fetchDepartments = async () => {
               try {
                    const data = await getAllDepartments();
                    setDepartments(data);
               } catch (error) {
                    console.error('Error fetching departments:', error);
               }
          };

          fetchProject();
          fetchDepartments();
     }, [projectId]);

     const handleDepartmentChange = (selectedOptions) => {
          const values = selectedOptions ? selectedOptions.map((option) => option.value) : [];
          setSelectedDepartmentIds(values);
     };

     const handleAddSubmit = async (e) => {
          e.preventDefault();
          try {
               await addDepartmentToProject(projectId, { department_ids: selectedDepartmentIds });
               setAddedDepartmentIds((prev) => [...prev, ...selectedDepartmentIds]);
               toast.success('Departments added successfully!');

               onAddSuccess();
          } catch (error) {
               console.error('Error adding departments:', error);
               toast.error('Error adding departments! Please try again.');
          }
     };

     const handleRemoveDepartment = async (departmentId) => {
          try {
               await removeDepartmentFromProject(projectId, { department_ids: [departmentId] });
               toast.success('Department removed successfully!');

               if (typeof onRemoveSuccess === 'function') {
                    onRemoveSuccess();
               } else {
                    console.warn('onRemoveSuccess is not a function');
               }

               setAddedDepartmentIds((prev) => prev.filter((id) => id !== departmentId));
          } catch (error) {
               console.error('Error removing department:', error);
               toast.error('Error removing department! Please try again.');
          }
     };

     // Lọc danh sách phòng ban để chỉ hiển thị những phòng ban chưa được thêm
     const availableDepartments = departments.filter((dept) => !addedDepartmentIds.includes(dept.id));

     return (
          <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
               <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-content">
                         <div className="modal-header">
                              <h5 className="modal-title">Thêm Phòng Ban cho Dự Án: {projectName}</h5>
                              <button type="button" className="btn-close" onClick={onClose}></button>
                         </div>
                         <div className="modal-body">
                              <form onSubmit={handleAddSubmit}>
                                   <div className="mb-3">
                                        <label htmlFor="projectName" className="form-label">
                                             Tên Dự Án
                                        </label>
                                        <input type="text" className="form-control" id="projectName" value={projectName} readOnly />
                                   </div>
                                   <div className="mb-3">
                                        <label htmlFor="existingDepartments" className="form-label">
                                             Chọn Phòng Ban Có Sẵn
                                        </label>
                                        <Select
                                             isMulti
                                             options={availableDepartments.map((dept) => ({ value: dept.id, label: dept.department_name }))}
                                             onChange={handleDepartmentChange}
                                             className="basic-multi-select"
                                             classNamePrefix="select"
                                        />
                                   </div>
                                   <button type="submit" className="btn btn-primary">
                                        Thêm
                                   </button>
                              </form>

                              <h6 className="mt-3">Phòng Ban Đã Thêm:</h6>
                              <ul className="list-group">
                                   {addedDepartmentIds.map((id) => {
                                        const department = departments.find((dept) => dept.id === id);
                                        return (
                                             <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                                                  {department ? department.department_name : 'Phòng ban không xác định'}{' '}
                                                  <button className="btn btn-danger btn-sm" onClick={() => handleRemoveDepartment(id)}>
                                                       Xóa
                                                  </button>
                                             </li>
                                        );
                                   })}
                              </ul>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default AddDepartmentForm;
