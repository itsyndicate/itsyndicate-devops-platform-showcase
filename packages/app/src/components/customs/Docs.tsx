import React, { useEffect, useState } from 'react';
import { Content, InfoCard } from '@backstage/core-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box, Typography } from '@material-ui/core';
import { Components } from 'react-markdown/lib/ast-to-react';

interface MarkdownPageProps {
  fileName: string; // The file to fetch
}

export const MarkdownPage: React.FC<MarkdownPageProps> = ({ fileName }) => {
  const [markdownContent, setMarkdownContent] = useState('');
  const [tableOfContents, setTableOfContents] = useState<
    { label: string; id: string; level: number }[]
  >([]);

  useEffect(() => {
    fetch(fileName)
      .then((response) => response.text())
      .then((text) => {
        // Ensure headers and their first lines are together
        const processedText = text.replace(/(#+\s.+)\n+/g, '$1\n');
        setMarkdownContent(processedText);

        // Generate TOC dynamically for all header levels (#, ##, ###, ####)
        const headings = processedText.match(/^(#{1,4})\s+.+$/gm);
        if (headings) {
          const uniqueIds: Set<string> = new Set();
          const toc = headings.map((heading) => {
            const level = heading.match(/#/g)?.length || 1;
            const label = heading.replace(/^#{1,4}\s/, '').trim();
            let id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            // Ensure unique IDs
            while (uniqueIds.has(id)) {
              id += '-1';
            }
            uniqueIds.add(id);

            return { label, id, level };
          });
          setTableOfContents(toc);
        }
      })
      .catch((err) => console.error(`Failed to load Markdown content from ${fileName}:`, err));
  }, [fileName]);

  const components: Components = {
    h1: ({ children }) => renderHeading(children, 'h1'),
    h2: ({ children }) => renderHeading(children, 'h2'),
    h3: ({ children }) => renderHeading(children, 'h3'),
    h4: ({ children }) => renderHeading(children, 'h4'),
  };

  const renderHeading = (children: React.ReactNode, tag: 'h1' | 'h2' | 'h3' | 'h4') => {
    const text = React.Children.toArray(children).join('');
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const variantMap: { [key: string]: any } = {
      h1: 'h3', // Largest
      h2: 'h4',
      h3: 'h5',
      h4: 'h6', // Smallest
    };

    return (
      <Typography id={id} variant={variantMap[tag]} gutterBottom>
        {children}
      </Typography>
    );
  };

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); // Prevent default link behavior
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      console.error(`Element with id '${id}' not found`);
    }
  };

  return (
    <Content>
      <Box display="flex">
        <Box flex="1" padding="16px" style={{ paddingTop: 0, marginLeft: '16px' }}>
          <ReactMarkdown
            children={markdownContent}
            remarkPlugins={[remarkGfm]}
            components={components} // Custom renderer for headings
          />
        </Box>
        <Box minWidth="200px" padding="16px">
          <InfoCard title="Table of Contents">
            {tableOfContents.map((item) => (
              <Box key={item.id} style={{ marginLeft: `${(item.level - 1) * 16}px` }}>
                <a href={`#${item.id}`} onClick={(e) => handleLinkClick(e, item.id)}>
                  {item.label}
                </a>
              </Box>
            ))}
          </InfoCard>
        </Box>
      </Box>
    </Content>
  );
};
