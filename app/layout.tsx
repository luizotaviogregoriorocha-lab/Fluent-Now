document.documentElement.setAttribute('data-theme', 'light');
                                }
                            }) ();
`,
                    }}
                />
                <UserProvider>
                    <div className="app-container relative z-10 min-h-screen flex">
                        {children}
                    </div>
                </UserProvider>
            </body>
        </html>
    );
}
