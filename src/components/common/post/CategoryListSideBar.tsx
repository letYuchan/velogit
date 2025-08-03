import { categories } from '@/utils/home';

const CategoryListSideBar = () => {
    if (!categories || categories.length === 0) return null;

    return (
        <aside className='fixed left-8 top-20 hidden w-40 rounded-xl bg-background px-4 py-6 opacity-70 shadow-md xl:flex'>
            <div className='flex w-full flex-col gap-4'>
                <h2 className='text-center text-xl font-bold text-foreground'>Categories</h2>
                <ul className='flex flex-col gap-1 font-semibold text-muted'>
                    {categories.map(category => (
                        <li
                            key={category}
                            className='text-center text-sm transition-colors hover:text-primary'
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default CategoryListSideBar;
