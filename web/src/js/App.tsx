import React, { useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

export function App(props: any)
{
    return <Outlet context={[]} />;
}
