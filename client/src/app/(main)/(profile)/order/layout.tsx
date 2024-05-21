import NavbarOrder from '@/components/nav_order';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className="">
                <NavbarOrder />

                {children}
            </div>
        </div>
    );
}
