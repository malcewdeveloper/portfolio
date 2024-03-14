'use client'

import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { createProject } from '@/app/lib/actionsProjects';
import { useFormState } from 'react-dom';
import { CategoryType, TagType } from '@/interfaces';
import classes from './ProjectModalForm.module.scss';


interface IProjectModalFormProps {
    tags: TagType[];
    categories: CategoryType[];
    isOpen: boolean;
    onClose: (value: boolean) => void;
}

const ProjectModalForm: React.FC<IProjectModalFormProps> = (props) => {
    const { tags, categories, isOpen, onClose } = props;

    const [fileName, setFileName] = React.useState('Файл не выбран');
    const [filesName, setFilesName] = React.useState('Файлы не выбраны');
    const cancelButtonRef = React.useRef(null);
    const singleInputRef = React.useRef<HTMLInputElement>(null);
    const multiInputRef = React.useRef<HTMLInputElement>(null);

    const initialState = { message: '', errors: {} };
    const [state, dispatch] = useFormState(createProject, initialState);

    const handleSingleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        
        if(fileList) {
            const filename = fileList[0]?.name;
            filename ? setFileName(filename) : setFileName('Файл не выбран');
        } 
    }

    const handleMultiFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;

        if(fileList) {
            const filenames = Array.from(fileList).map(file => file.name).join(', ');
            filenames ? setFilesName(filenames) : setFilesName('Файлы не выбраны');
        }
    }

    const handleSingleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        document.getElementById('preview_image_url')?.click();
    }

    const handleMultiUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        document.getElementById('image_urls')?.click();
    }

    const handleSingleRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(singleInputRef.current) {
            singleInputRef.current.value = '';
            setFileName('Файл не выбран');
        }
    }

    const handleMultiRemoveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(multiInputRef.current) {
            multiInputRef.current.value = '';
            setFilesName('Файлы не выбраны');
        }
    }

    return (
        <Transition.Root show={ isOpen } as={ React.Fragment }>
            <Dialog 
            as="div" 
            className={ classes.root } 
            initialFocus={ cancelButtonRef } 
            onClose={ onClose }>
				<Transition.Child
				as={ React.Fragment }
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
				>
					<div className={ classes.background } />
				</Transition.Child>
				<div className={ classes.wrapper }>
					<div className={ classes.container }>
						<Transition.Child
						as={ React.Fragment }
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className={ classes.panel }>
								<form action={ dispatch }>
									<div className={ classes.content }>
										<div className={ classes.contentWrapper }>
											<Dialog.Title as="h3" className={ classes.heading }>
												Добавить проект
											</Dialog.Title>
											<div className={ classes.inputWrapper }>   
												<input className={ classes.input } type='text' name='name' id='name' placeholder='Название проекта' />  
											</div>
                                            <div className={ classes.inputWrapper }>
                                                <textarea className={ classes.input } name='description' id='description' placeholder='Описание проекта' />
                                            </div>
                                            <div className={ classes.inputWrapper }>
                                                <select className={ classes.input } name='category_id' defaultValue="">
                                                    <option value="" disabled className='text-[#B9C8D4]'>Категория</option>
                                                    { categories.map(category => <option key={ category.id } value={ category.id }>{ category.name }</option>) }
                                                </select>
                                                <select className={ classes.input } name='tag_id' defaultValue="">
                                                    <option value="" disabled className='text-[#B9C8D4]'>Тег</option>
                                                    { tags.map(tag => <option key={ tag.id } value={ tag.id }>{ tag.name }</option>) }
                                                </select>
                                            </div>
                                            <Dialog.Title as="h3" className={ classes.heading }>
												Контент
											</Dialog.Title>
                                            <div className={ classes.fileWrapper }>
                                                <div className={ classes.fieldFileWrapper }>
                                                    <input ref={ singleInputRef } type='file' name='preview_image_url' id='preview_image_url' onChange={ handleSingleFileChange } className={ classes.file } />
                                                    <label htmlFor='preview_image_url' className={ classes.label }>
                                                        <div className={ classes.fileFake }>{ fileName }</div>
                                                        <div className='flex items-center gap-2'>                                                            
                                                            <button type='button' className={ classes.buttonUpload } onClick={ handleSingleUploadClick }>Загрузить</button>
                                                            <button type='button' className={ classes.buttonClose } onClick={ handleSingleRemoveClick }>x</button>
                                                        </div>
                                                    </label>
                                                </div>
                                                <div className={ classes.fieldFileWrapper }>
                                                    <input ref={ multiInputRef } type='file' multiple={true} name='image_urls' id='image_urls' onChange={ handleMultiFileChange } className={ classes.file } />
                                                    <label htmlFor='image_urls' className={ classes.label }>
                                                        <div className={ classes.fileFake }>{ filesName }</div>
                                                        <div className='flex items-center gap-2'>                                                            
                                                            <button type='button' className={ classes.buttonUpload } onClick={ handleMultiUploadClick }>Загрузить</button>
                                                            <button type='button' className={ classes.buttonClose } onClick={ handleMultiRemoveClick }>x</button>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
										</div>
									</div>
									<div className={ classes.actions }>
										<button
											type="submit"
											className={ classes.button }
                                            onClick={() => { onClose(false); setFileName('Файл не выбран'); setFilesName('Файлы не выбраны'); }}
										>
											<span></span>
											Сохранить
										</button>
										<button
											type="button"
											className={ classes.button }
                                            onClick={() => onClose(false)}
										>
											<span></span>
											Отменить
										</button>
									</div>
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
            </Dialog>
		</Transition.Root>
  	)
}

export default ProjectModalForm;
