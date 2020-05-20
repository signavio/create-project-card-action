"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github_1 = require("@actions/github");
function run() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const octokit = new github_1.GitHub(core.getInput('github_token'));
            const columnId = +core.getInput("column_id");
            const ignoreDrafts = core.getInput('ignore_drafts');
            const owner = github_1.context.repo.owner;
            const repo = github_1.context.repo.repo;
            const pr_number = Number((_a = github_1.context.payload.pull_request) === null || _a === void 0 ? void 0 : _a.number);
            const prId = (_b = github_1.context.payload.pull_request) === null || _b === void 0 ? void 0 : _b.id;
            octokit.pulls.get({
                owner: owner,
                repo: repo,
                pull_number: pr_number,
            }).then(result => {
                const isDraft = result.data.draft;
                if (ignoreDrafts) {
                    if (!isDraft) {
                        createCard(octokit, columnId, prId);
                    }
                }
                else {
                    createCard(octokit, columnId, prId);
                }
            }, error => {
                core.setFailed(error);
            });
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
function createCard(octokit, columnId, prId) {
    octokit.projects.createCard({
        column_id: columnId,
        content_id: prId,
        content_type: 'PullRequest'
    });
}
run();
