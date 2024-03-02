import { trycatchFunc } from "../helpers/trycatchFunc.js";
import { getAllThemesDB, updateThemeDB } from "../services/themeService.js";

export const getUserTheme = trycatchFunc(async (req, res) => {
  const { _id: idOwner } = req.user;
  const user = await getAllThemesDB(idOwner);

  res.json({
    email: user.email,
    theme: user.theme,
  });
});

export const updateUserTheme = trycatchFunc(async (req, res) => {
  const { _id: idOwner } = req.user;
  const { theme } = req.body;

  const updatedTheme = await updateThemeDB(idOwner, theme);

  res.status(200).json({
    email: updatedTheme.email,
    theme: updatedTheme.theme,
  });
});
