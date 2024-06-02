import SidebarAdmin from '@/components/sidebar_admin';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className="grid grid-cols-10 gap-10">
                <div className="col-span-2 ">
                    <SidebarAdmin />
                </div>
                <div className="col-span-8 shadow-xl h-screen">{children}</div>
            </div>
        </div>
    );
}
