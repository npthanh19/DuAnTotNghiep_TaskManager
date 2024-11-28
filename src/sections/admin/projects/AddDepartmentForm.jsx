import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { addDepartmentToProject, removeDepartmentFromProject, getProjectById } from '../../../services/projectsService';
import { getAllDepartments } from '../../../services/deparmentsService';
import Swal from 'sweetalert2';


const AddDepartmentForm = ({ projectId, onClose, onAddSuccess, onRemoveSuccess }) => {
    const { t } = useTranslation();
    const [departments, setDepartments] = useState([]);
    const [selectedDepartmentIds, setSelectedDepartmentIds] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [addedDepartmentIds, setAddedDepartmentIds] = useState([]);
    
    const { register, handleSubmit, setValue, formState: { errors }, setError, clearErrors } = useForm();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const projectData = await getProjectById(projectId);
                setProjectName(projectData.project_name);
                setAddedDepartmentIds(projectData.departments.map((dept) => dept.id));
                setValue('projectName', projectData.project_name);
            } catch (error) {
                console.error('Error fetching project:', error);
                Swal.fire({
                    icon: 'error',
                    title: t('Error fetching project!'),
                    text: t('Something went wrong'),
               });
            }
        };

        const fetchDepartments = async () => {
            try {
                const data = await getAllDepartments();
                setDepartments(data);
            } catch (error) {
                console.error('Error fetching departments:', error);
                Swal.fire({
                    icon: 'error',
                    title: t('Error fetching departments!'),
                    text: t('Something went wrong'),
               });
            }
        };

        fetchProject();
        fetchDepartments();
    }, [projectId, setValue]);

    const handleDepartmentChange = (selectedOptions) => {
        const values = selectedOptions ? selectedOptions.map((option) => option.value) : [];
        setSelectedDepartmentIds(values);

        if (values.length > 0) {
            clearErrors('selectedDepartments'); // Clear error if options are selected
        } else {
            setError('selectedDepartments', { type: 'manual', message: t('At least one department must be selected!') }); // Set error if no options are selected
        }
    };

    const handleAddSubmit = async (data) => {
        if (selectedDepartmentIds.length === 0) {
            Swal.fire({
                icon: 'error',
                title: t('At least one department must be selected!'),
                text: t('Something went wrong'),
           });
            return;
        }

        try {
            await addDepartmentToProject(projectId, { department_ids: selectedDepartmentIds });
            setAddedDepartmentIds((prev) => [...prev, ...selectedDepartmentIds]);
            Swal.fire({
                icon: 'success',
                text: t('Departments added successfully!'),
                position: 'top-right',
                toast: true,
                timer: 2000,
                showConfirmButton: false,
           });

            if (typeof onAddSuccess === 'function') {
                onAddSuccess();
            }
        } catch (error) {
            console.error('Error adding departments! Please try again.', error);
            Swal.fire({
                icon: 'error',
                title: t('Error adding departments! Please try again.'),
                text: t('Something went wrong'),
           });
        }
    };

    const handleRemoveDepartment = async (departmentId) => {
        try {
            await removeDepartmentFromProject(projectId, { department_ids: [departmentId] });
            Swal.fire({
                icon: 'success',
                text: t('Department removed successfully!'),
                position: 'top-right',
                toast: true,
                timer: 2000,
                showConfirmButton: false,
           });

            if (typeof onRemoveSuccess === 'function') {
                onRemoveSuccess();
            }

            setAddedDepartmentIds((prev) => prev.filter((id) => id !== departmentId));
        } catch (error) {
            console.error('Error removing department:', error);
            Swal.fire({
                icon: 'error',
                title: t('Error removing department! Please try again.'),
                text: t('Something went wrong'),
           });
        }
    };

    const availableDepartments = departments.filter((dept) => !addedDepartmentIds.includes(dept.id));

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onClick={onClose}>
            <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{t('Add Departments to Project')}: {projectName}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(handleAddSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="projectName" className="form-label">
                                    {t('Project Name')}
                                </label>
                                <input
                                    type="text"
                                    id="projectName"
                                    className={`form-control form-control-sm ${errors.projectName ? 'is-invalid' : ''}`}
                                    {...register('projectName', { required: t('Project name is required') })}
                                />
                                {errors.projectName && <div className="invalid-feedback">{errors.projectName.message}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="existingDepartments" className="form-label">
                                    {t('Select Available Departments')} 
                                </label>
                                <Select
                                    isMulti
                                    options={availableDepartments.map((dept) => ({ value: dept.id, label: dept.department_name }))}
                                    onChange={handleDepartmentChange}
                                    classNamePrefix="select">
                                    </Select>
                                {errors.selectedDepartments && <div className="invalid-feedback">{errors.selectedDepartments.message}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary">
                                {t('Add')}   
                            </button>
                        </form>

                        <h6 className="mt-3">{t('Added Departments')} :</h6>
                        <ul className="list-group">
                            {addedDepartmentIds.map((id) => {
                                const department = departments.find((dept) => dept.id === id);
                                return (
                                    <li key={id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {department ? department.department_name : 'Department not found'}{' '}
                                        <button className="btn btn-danger btn-sm" onClick={() => handleRemoveDepartment(id)}>
                                            {t('Delete')}
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
