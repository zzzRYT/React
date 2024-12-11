import styled from "styled-components"

export const backgroundDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100dvw;
  max-width: 100%;
  height: 100dvh;
`

export const BoxContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 360px;
  border-radius: 20px;
  box-shadow: 5px 6px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
`

export const Contents = styled.main`
  padding-left: 6px;
  padding-right: 8px;
  > h1 {
    font-size: 20px;
    margin: 0px 0px 16px 0px;
  }
`

export const TextInputWrapper = styled.div`
  position: relative;
  height: 38px;
  box-sizing: border-box;
  display: flex;
  > input {
    width: 100%;
    border: none;
    font-size: 16px;
    background-color: inherit;
    padding-left: 10px;
  }
  > label {
    position: absolute;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    width: 100%;
    display: inline-block;
    top: 38px;
  }
  & button {
    border: none;
    background-color: inherit;
    cursor: pointer;
  }
`

export const CreateBoxWrapper = styled.div`
  margin-top: 16px;
  position: relative;
  height: 38px;
  box-sizing: border-box;
  display: flex;
  > label {
    width: 100%;
    position: absolute;
    top: 38px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  }
  .inputText {
    width: 100%;
    height: 20px;
    margin: auto 0px auto 12px;
    border-radius: 20;
  }
  > button {
    background-color: inherit;
    border: none;
    cursor: pointer;
  }
`

export const BeforeModifyDiv = styled.div`
  width: 100%;
  align-content: center;
  padding-left: 12px;
`
