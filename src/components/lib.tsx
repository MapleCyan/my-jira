import styled from "@emotion/styled";
import { Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";
import { useEffect } from "react";

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottom + "rem"};
  user-select: none;
`;

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullPageLoading = () => (
  <FullPage>
    <Spin size="large" />
  </FullPage>
);

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
  <FullPage>
    <Typography.Text type="danger">{error?.message}</Typography.Text>
    <DevTools />
  </FullPage>
);

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  const oldTitle = document.title;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (keepOnUnmount === false) {
        document.title = oldTitle;
      }
    };
  }, []);
};
