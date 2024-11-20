import React, { useEffect, useState } from 'react';
import { Page, Header, Content, InfoCard } from '@backstage/core-components';
import { HeaderWorldClock } from '@backstage/plugin-home';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, Typography } from '@material-ui/core';
import { Components } from 'react-markdown/lib/ast-to-react';
import { MarkdownPage } from '../customs/Docs';

const clockConfigs = [
  { label: 'New York', timeZone: 'America/New_York' },
  { label: 'Greenwich', timeZone: 'UTC' },
  { label: 'Kyiv', timeZone: 'Europe/Kiev' },
  { label: 'Tokyo', timeZone: 'Asia/Tokyo' },
];

const timeFormat: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
};

export const HomePage = () => {

  return (
    <Page themeId="website">
      <Header
        title="ITSyndicate internal platform"
        pageTitleOverride="Home"
      >
        <HeaderWorldClock
          clockConfigs={clockConfigs}
          customTimeFormat={timeFormat}
        />
      </Header>
      <MarkdownPage fileName={'/home.md'} />
    </Page>
  );
};