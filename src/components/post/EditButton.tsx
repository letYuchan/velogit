import { useIsDesktop } from '@/hooks/useIsDesktop';
import clsx from 'clsx';
import { MdOutlineEditNote } from 'react-icons/md';
import { Link } from 'react-router-dom';

interface EditButtonProps {
    slug: string;
}

const EditButton = ({ slug }: EditButtonProps) => {
    const isDesktop = useIsDesktop();

    return (
        <Link to={`/edit/${slug}`}>
            <MdOutlineEditNote className={clsx('size-5 text-foreground', isDesktop && 'size-4')} />
        </Link>
    );
};

export default EditButton;
