import TalesLayout from '@/Layouts/TalesLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth }) {

    return(
        <TalesLayout
            auth={auth}
        >
            <Head title='Mis Historias'/>
            
        </TalesLayout>
    );
}
