// VeeValidate
import { extend, ValidationObserver, ValidationProvider, setInteractionMode, localize } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import ja from "vee-validate/dist/locale/ja.json";

export function apply(VueApp) {
  // 全ルール、全メッセージの日本語化
  for (const rule in rules) {
    extend(rule, rules[rule]);
  }
  VueApp.component("ValidationProvider", ValidationProvider);
  VueApp.component("ValidationObserver", ValidationObserver);
  setInteractionMode("eager");
  localize("ja", ja);

  applyCustomValidation();
}

function applyCustomValidation() {
  // カスタムメッセージ変更、今後同一ルールで違う文面を使う場合は関数別で分岐
  extend("required", {
    validate(value) {
      console.log(value);
      if (value) {
        return true;
      }
    },
    message: (field) => `${field}を入力してください`,
  });

  extend("max", {
    params: ["max"],
    validate(value, { max }) {
      return value.length <= Number(max);
    },
    message: (field, { max }) => `${field}は${max}文字以内で入力してください`,
  });

  extend("integer", {
    message: "整数で入力してください",
  });

  // 小数(10進数)
  extend("decimal", {
    validate: (value, { decimals = "*", separator = "." } = {}) => {
      if (value === null || value === undefined || value === "") {
        return {
          valid: false,
        };
      }
      if (Number(decimals) === 0) {
        return {
          valid: /^-?\d*$/.test(value),
        };
      }
      const regexPart = decimals === "*" ? "+" : `{1,${decimals}}`;
      const regex = new RegExp(`^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`);

      return {
        valid: regex.test(value),
      };
    },
    message: "小数(10桁以内)で入力してください",
  });

  // ナンバーボックス大小比較
  extend("number_box", {
    params: ["max"],
    validate(value, { max }) {
      if (value === "" || value === null || max === "" || max === null) {
        return true;
      }
      return Number(value) < Number(max);
    },
    message: "最小値は最大値未満にしてください",
  });

  // 先頭に任意文字列禁止
  // 複数の文字列についてチェックしたい場合は、paramsにカンマ区切りで設定する
  // ex: A,B
  extend("first_deny", {
    params: ["params"],
    validate(value, { params }) {
      if (typeof value !== "string") return false;

      if (typeof params === "string") {
        return value.trim().indexOf(params) !== 0;
      } else if (typeof params === "object") {
        return !Object.values(params).some((param) => value.trim().indexOf(param) === 0);
      }
      return false;
    },
    message: (field, { params }) => `${field}の先頭に「${params}」は入力できません`,
  });

  // 末尾に任意文字列禁止
  // 複数の文字列についてチェックしたい場合は、paramsにカンマ区切りで設定する
  // ex: A,B
  extend("last_deny", {
    params: ["params"],
    validate(value, { params }) {
      if (typeof value !== "string") return false;

      if (typeof params === "string") {
        return !value.trim().endsWith(params);
      } else if (typeof params === "object") {
        return !Object.values(params).some((param) => value.trim().endsWith(param));
      }
      return false;
    },
    message: (field, { params }) => `${field}の末尾に「${params}」は入力できません`,
  });

  // 任意文字列禁止
  // 複数の文字列についてチェックしたい場合は、paramsにカンマ区切りで設定する
  // ex: A,B
  extend("string_deny", {
    params: ["params"],
    validate(value, { params }) {
      if (typeof value !== "string") return false;

      if (typeof params === "string") {
        return value.indexOf(params) === -1;
      } else if (typeof params === "object") {
        return !Object.values(params).some((param) => value.indexOf(param) !== -1);
      }
      return false;
    },
    message: (field, { params }) => `${field}に「${params}」は入力できません`,
  });

  // カンマ禁止
  extend("comma_deny", {
    validate(value) {
      if (typeof value !== "string") return false;

      return value.indexOf(",") === -1;
    },
    message: (field) => `${field}に「,」は入力できません`,
  });

  // 自然数、数値のみ
  extend("natural_only", {
    validate(value) {
      // 数値だけ使われているかのチェック
      const reg = new RegExp(/^([1-9]\d*|0)$/);
      return reg.test(value);
    },
    message: (field) => `${field}は0より大きい数値で入力してください`,
  });

  // 正の整数、数値のみ
  extend("number_only", {
    validate(value) {
      // 数値だけ使われているかのチェック
      const reg = new RegExp(/^([1-9]\d*|0)$/);
      return reg.test(value);
    },
    message: (field) => `${field}は0以上の数値で入力してください`,
  });

  // 正の小数、数値のみ
  extend("float_only", {
    validate(value) {
      // 数値だけ使われているかのチェック
      const reg = new RegExp(/^([1-9]\d*|0)(\.\d+)?$/);
      return reg.test(value);
    },
    message: (field) => `${field}は0以上の数値のみで入力してください`,
  });

  // 文字数制限、整数かつ0より大きい
  extend("custom_length", {
    validate(value) {
      try {
        return Number(value) > 0;
      } catch (error) {
        return true;
      }
    },
    message: (field) => `${field}は0より大きい整数を入力してください`,
  });

  // ナンバーボックス、0(を含む)以上の整数
  extend("custom_number", {
    validate(value) {
      try {
        return Number(value) >= 0;
      } catch (error) {
        return true;
      }
    },
    message: (field) => `${field}は0以上の整数を入力してください`,
  });

  // ナンバーボックス、0(を含む)以上の小数
  extend("custom_float", {
    validate(value) {
      try {
        return Number(value) >= 0;
      } catch (error) {
        return true;
      }
    },
    message: (field) => `${field}は0以上の数値を入力してください`,
  });

  // ナンバーボックス入力値制限、整数(正の数、負の数)
  extend("integer_only", {
    validate(value) {
      try {
        const i = value - 0;
        return Number.isInteger(i);
      } catch (error) {
        alert(error);
        return true;
      }
    },
    message: (field) => `${field}は整数で入力してください`,
  });

  // ナンバーボックス入力値制限、整数あるいは小数(正の数、負の数)
  extend("decimal_allowed", {
    validate(value) {
      try {
        const i = Number(value);
        return isNaN(i) ? false : true;
      } catch (error) {
        return false;
      }
    },
    message: (field) => `${field}は数値を入力してください`,
  });

  // 整数部分桁数
  extend("number_length", {
    params: ["max"],
    validate(value, { max }) {
      try {
        const num = String(value).split(".")[0];
        const count = num.length ? num.length : 0;
        return count <= Number(max);
      } catch (error) {
        return true;
      }
    },
    message: (field, { max }) => `${field}の整数の桁数を${max}以下にしてください`,
  });

  // 小数点以下桁数
  extend("decimal_length", {
    params: ["max"],
    validate(value, { max }) {
      try {
        const num = String(value).split(".")[1];
        const count = num.length ? num.length : 0;
        return count <= Number(max);
      } catch (error) {
        return true;
      }
    },
    message: (field, { max }) => `${field}の小数点以下の桁数を${max}以下にしてください`,
  });
}
