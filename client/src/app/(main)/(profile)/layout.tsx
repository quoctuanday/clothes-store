import SidebarProfile from '@/components/sidebar_profile';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className="px-10 py-8">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-3 shadow rounded">
                        <SidebarProfile />
                    </div>
                    <div className="col-span-9  rounded shadow">{children}</div>
                </div>
            </div>
        </div>
    );
}
