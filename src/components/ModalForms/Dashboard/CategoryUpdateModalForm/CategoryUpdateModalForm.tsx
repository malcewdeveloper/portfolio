'use client'

import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { updateCategory } from '@/app/lib/actionsCategories';
import { useFormState } from 'react-dom';
import { CategoryType } from '@/interfaces';
import classes from './CaetgoryUpdateModalForm.module.scss';

interface ICategoryUpdateModalFormProps {
    category: CategoryType;
	isOpen: boolean;
	onClose: (value: boolean) => void;
}

const CategoryUpdateModalForm: React.FC<ICategoryUpdateModalFormProps> = (props) => {
    const { category, isOpen, onClose } = props;

    const cancelButtonRef = React.useRef(null);

	const updateCategoryWithId = updateCategory.bind(this, category.id);

    const initialState = { message: '', errors: {} };

    const [state, dispatch] = useFormState(updateCategoryWithId, initialState);

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
												Изменить категорию
											</Dialog.Title>
											<div className={ classes.inputWrapper }>   
												<input className={ classes.input } type='text' name='name' id='name' defaultValue={ category.name }  placeholder='Название категории' />  
											</div>
										</div>
									</div>
									<div className={ classes.actions }>
										<button
											type="submit"
											className={ classes.button }
											onClick={() => onClose(false)}
										>
											<span></span>
											Сохранить
										</button>
										<button
											type="button"
											className={ classes.button }
											onClick={() => onClose(false)}
											ref={ cancelButtonRef }
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

export default CategoryUpdateModalForm;